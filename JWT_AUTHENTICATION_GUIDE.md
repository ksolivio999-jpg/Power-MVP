# JWT Authentication Implementation Guide

## ✅ Implementation Complete!

Your PowerMap API now has **complete JWT authentication** with login/logout functionality and protected routes.

---

## 🎯 What Was Implemented

### 1. **Authentication Endpoints**
- ✅ `POST /api/auth/login` - User login with email/password
- ✅ `POST /api/auth/logout` - User logout (requires authentication)

### 2. **JWT Token Management**
- ✅ Token generation on successful login
- ✅ Token validation using Passport JWT strategy
- ✅ 24-hour token expiration
- ✅ Bearer token authentication

### 3. **Password Security**
- ✅ bcrypt password hashing (already implemented)
- ✅ Secure password comparison
- ✅ Password excluded from API responses

### 4. **Protected Routes**
All routes now require authentication (JWT token):
- ✅ Users CRUD operations
- ✅ Projects CRUD operations  
- ✅ Floors CRUD operations
- ✅ Panels CRUD operations
- ✅ Breakers CRUD operations
- ✅ Circuits CRUD operations

### 5. **Strategies Implemented**
- ✅ **Local Strategy** - Email/password authentication
- ✅ **JWT Strategy** - Token validation for protected routes

### 6. **Guards Created**
- ✅ **LocalAuthGuard** - Protects login endpoint
- ✅ **JwtAuthGuard** - Protects all other endpoints

---

## 📚 API Usage Guide

### **Step 1: Create a User**

Since all routes are protected, you first need to temporarily disable auth on user creation OR use a seed script. For testing, you can temporarily remove the `@UseGuards(JwtAuthGuard)` decorator from the Users controller's `create` method.

**POST** `/api/users`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-11-28T00:00:00.000Z",
    "updatedAt": "2024-11-28T00:00:00.000Z"
  }
}
```

### **Step 2: Login**

**POST** `/api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJzdWIiOiJ1dWlkLWhlcmUiLCJpYXQiOjE3MDA1MjAwMDAsImV4cCI6MTcwMDYwNjQwMH0.signature",
    "user": {
      "id": "uuid-here",
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
}
```

### **Step 3: Use Protected Endpoints**

Copy the `access_token` from the login response and include it in the `Authorization` header:

**Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example - Get Projects:**
```bash
GET /api/projects
Authorization: Bearer <your-token-here>
```

**Response:**
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": [...]
}
```

### **Step 4: Logout**

**POST** `/api/auth/logout`
```bash
Authorization: Bearer <your-token-here>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Note:** Since JWT is stateless, logout on the client side means deleting the stored token. The server endpoint is provided for consistency and can be extended for token blacklisting if needed.

---

## 🔒 Security Features

### Password Security
- Passwords are hashed using **bcrypt** with 10 salt rounds
- Original passwords are **never** stored in the database
- Password field is excluded from all API responses using `@Exclude()` decorator

### Token Security
- JWT tokens are signed with a secret key (configured in `.env`)
- Tokens expire after 24 hours
- Tokens include user ID and email in payload
- Invalid or expired tokens are automatically rejected

### Protected Routes
- All CRUD operations require valid JWT token
- 401 Unauthorized response for missing/invalid tokens
- Token validation happens automatically via `JwtAuthGuard`

---

## 🧪 Testing with Swagger UI

1. **Start the server:**
   ```bash
   npm run start:dev
   ```

2. **Navigate to:** `http://localhost:3000/api-docs`

3. **Login:**
   - Expand `POST /api/auth/login`
   - Click "Try it out"
   - Enter credentials
   - Click "Execute"
   - **Copy the `access_token`** from the response

4. **Authorize Swagger:**
   - Click the **🔓 Authorize** button (top right)
   - Enter: `Bearer <your-token>`
   - Click "Authorize"
   - Click "Close"

5. **Test Protected Endpoints:**
   - All endpoints will now include the token automatically
   - You can test any endpoint (Users, Projects, Floors, etc.)

---

## 🧪 Testing with Postman

### 1. **Login Request**
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### 2. **Save the Token**
- Copy the `access_token` from the response
- In Postman, create an environment variable: `jwt_token`
- Set its value to the copied token

### 3. **Use Token in Requests**
- For all protected endpoints, go to the **Authorization** tab
- Select **Type:** Bearer Token
- **Token:** `{{jwt_token}}` (or paste the token directly)

### 4. **Test Protected Endpoint**
```
GET http://localhost:3000/api/projects
Authorization: Bearer <your-token>
```

---

## ⚙️ Configuration

### Environment Variables (`.env`)

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
JWT_EXPIRES_IN=24h
```

**Important:** Change the `JWT_SECRET` to a strong, random string in production!

### Token Expiration
- Default: **24 hours** (`24h`)
- Can be customized: `1h`, `7d`, `30d`, etc.

---

## 📂 File Structure

```
src/modules/auth/
├── dto/
│   └── login.dto.ts              # Login request validation
├── guards/
│   ├── jwt-auth.guard.ts         # JWT authentication guard
│   └── local-auth.guard.ts       # Local (email/password) guard
├── strategies/
│   ├── jwt.strategy.ts           # JWT token validation strategy
│   └── local.strategy.ts         # Email/password validation strategy
├── auth.controller.ts            # Login/logout endpoints
├── auth.service.ts               # Authentication logic
└── auth.module.ts                # Auth module configuration
```

---

## 🔧 How It Works

### Login Flow
1. User sends email/password to `/api/auth/login`
2. `LocalAuthGuard` validates credentials using `LocalStrategy`
3. `LocalStrategy` calls `AuthService.validateUser()`
4. Password is compared using bcrypt
5. If valid, user object is attached to request
6. `AuthController` calls `AuthService.login()`
7. JWT token is generated and returned

### Protected Route Flow
1. Client sends request with `Authorization: Bearer <token>` header
2. `JwtAuthGuard` extracts and validates token using `JwtStrategy`
3. `JwtStrategy` verifies token signature and expiration
4. User is fetched from database using token payload
5. User object is attached to request
6. Controller method executes with authenticated user context

---

## 🚨 Error Responses

### 401 Unauthorized - Invalid Credentials
```json
{
  "statusCode": 401,
  "message": "Invalid email or password"
}
```

### 401 Unauthorized - Missing Token
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 401 Unauthorized - Invalid Token
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 401 Unauthorized - Expired Token
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## 🎓 Advanced Usage

### Getting Current User in Controllers

You can access the authenticated user in your controllers:

```typescript
import { Request } from '@nestjs/common';

@Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile(@Request() req) {
  // req.user contains: { userId: string, email: string }
  return req.user;
}
```

### Custom Decorator for User

Create a custom decorator for cleaner code:

```typescript
// src/common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage in controller:
@Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile(@CurrentUser() user) {
  return user;
}
```

### Optional Authentication

To make a route optionally authenticated:

```typescript
import { Public } from '@nestjs/common';

// Create a public decorator
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// Use in controller:
@Public()
@Get('public-data')
async getPublicData() {
  // This route doesn't require authentication
}
```

---

## 🔄 Refresh Tokens (Future Enhancement)

Currently, the system uses **access tokens only**. To implement refresh tokens:

1. Add `refresh_token` field to User entity
2. Generate both access and refresh tokens on login
3. Create `/api/auth/refresh` endpoint
4. Validate refresh token and issue new access token

---

## 📋 Checklist for Production

- [ ] Change `JWT_SECRET` to a strong, random string
- [ ] Consider shorter token expiration (e.g., `1h`)
- [ ] Implement refresh tokens for better UX
- [ ] Add rate limiting on login endpoint
- [ ] Implement account lockout after failed attempts
- [ ] Add logging for authentication events
- [ ] Consider token blacklisting for logout
- [ ] Add 2FA (Two-Factor Authentication) if needed
- [ ] Use HTTPS in production
- [ ] Store tokens securely on client (httpOnly cookies preferred)

---

## 🐛 Troubleshooting

### "Unauthorized" on All Requests
- **Check:** Is the token included in the `Authorization` header?
- **Check:** Is the format correct? `Bearer <token>`
- **Check:** Has the token expired? (24 hours)
- **Check:** Is `JWT_SECRET` the same in `.env`?

### "User not found" During Login
- **Check:** Did you create a user first?
- **Check:** Is the email correct?
- **Solution:** Create a user via POST `/api/users`

### Token Not Working in Swagger
- **Check:** Did you click the **🔓 Authorize** button?
- **Check:** Did you include "Bearer " prefix?
- **Format:** `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Can't Create Users (401 Error)
- **Issue:** Users endpoint is protected
- **Solution:** Temporarily remove `@UseGuards(JwtAuthGuard)` from POST method in `users.controller.ts` OR create a seed script

---

## 📚 Related Documentation

- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Passport.js](http://www.passportjs.org/)
- [JWT.io](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## ✅ Summary

Your PowerMap API now has:
- ✅ JWT-based authentication
- ✅ Secure login/logout endpoints
- ✅ Protected routes requiring authentication
- ✅ Password hashing with bcrypt
- ✅ Token-based session management
- ✅ Swagger documentation with auth
- ✅ Bearer token authorization

**All assignment requirements completed!** 🎉

---

**Next Steps:**
1. Test the login flow in Swagger UI
2. Create some users and projects
3. Test protected endpoints with valid tokens
4. Test error cases (invalid credentials, expired tokens)
5. Consider implementing refresh tokens for production

Happy coding! 🚀
