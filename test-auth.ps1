# JWT Authentication Test Script

Write-Host "`n=== JWT Authentication Testing ===" -ForegroundColor Cyan

# Test 1: Try to access protected endpoint without token
Write-Host "`n1. Testing protected endpoint WITHOUT authentication (should return 401)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/users" -Method GET -ErrorAction Stop
    Write-Host "Response: $($response.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✓ Correctly returned 401 Unauthorized" -ForegroundColor Green
    } else {
        Write-Host "✗ Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 2: Create a test user first (need to temporarily disable guard or use direct DB)
Write-Host "`n2. Creating test user..." -ForegroundColor Yellow
$createUserBody = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $userResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -Body $createUserBody -ContentType "application/json" -ErrorAction SilentlyContinue
    Write-Host "✓ Test user created or already exists" -ForegroundColor Green
} catch {
    Write-Host "Note: User creation requires authentication (or user already exists)" -ForegroundColor Yellow
}

# Test 3: Try to login with wrong credentials
Write-Host "`n3. Testing login with WRONG credentials (should return 401)..." -ForegroundColor Yellow
$wrongLoginBody = @{
    email = "test@example.com"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $wrongLoginBody -ContentType "application/json" -ErrorAction Stop
    Write-Host "✗ Should have failed with wrong password" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✓ Correctly returned 401 for wrong password" -ForegroundColor Green
    } else {
        Write-Host "✗ Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 4: Login with correct credentials (if user exists)
Write-Host "`n4. Testing login with CORRECT credentials..." -ForegroundColor Yellow
$loginBody = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -ErrorAction Stop
    
    if ($loginResponse.access_token) {
        Write-Host "✓ Login successful! Token received: $($loginResponse.access_token.Substring(0, 20))..." -ForegroundColor Green
        $token = $loginResponse.access_token
        
        # Test 5: Access protected endpoint WITH valid token
        Write-Host "`n5. Testing protected endpoint WITH valid token..." -ForegroundColor Yellow
        $headers = @{
            "Authorization" = "Bearer $token"
        }
        
        try {
            $protectedResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET -Headers $headers -ErrorAction Stop
            Write-Host "✓ Successfully accessed protected endpoint!" -ForegroundColor Green
            Write-Host "Response: Users found: $($protectedResponse.Count)" -ForegroundColor Cyan
        } catch {
            Write-Host "✗ Failed to access protected endpoint: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        # Test 6: Logout
        Write-Host "`n6. Testing logout..." -ForegroundColor Yellow
        try {
            $logoutResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/logout" -Method POST -Headers $headers -ErrorAction Stop
            Write-Host "✓ Logout successful: $($logoutResponse.message)" -ForegroundColor Green
        } catch {
            Write-Host "✗ Logout failed: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        # Test 7: Try to access with invalid token format
        Write-Host "`n7. Testing with invalid token format..." -ForegroundColor Yellow
        $badHeaders = @{
            "Authorization" = "Bearer invalid-token"
        }
        
        try {
            $response = Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET -Headers $badHeaders -ErrorAction Stop
            Write-Host "✗ Should have rejected invalid token" -ForegroundColor Red
        } catch {
            if ($_.Exception.Response.StatusCode -eq 401) {
                Write-Host "✓ Correctly rejected invalid token" -ForegroundColor Green
            } else {
                Write-Host "✗ Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
        
    } else {
        Write-Host "✗ No access token in response" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Note: This could mean the test user doesn't exist yet." -ForegroundColor Yellow
    Write-Host "You can manually create a user through the database or by temporarily removing the guard." -ForegroundColor Yellow
}

Write-Host "`n=== Testing Complete ===" -ForegroundColor Cyan
Write-Host "`nNote: To fully test, you may need to:" -ForegroundColor Yellow
Write-Host "1. Insert a test user directly into the database, OR" -ForegroundColor Yellow
Write-Host "2. Temporarily remove @UseGuards(JwtAuthGuard) from UsersController.create(), OR" -ForegroundColor Yellow
Write-Host "3. Use Swagger UI at http://localhost:3000/api-docs" -ForegroundColor Yellow
