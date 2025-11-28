# PowerMap API - Swagger Documentation Guide

## 🎉 Swagger Documentation Successfully Configured!

Your PowerMap API now has complete Swagger/OpenAPI documentation automatically generated for all endpoints.

## 📚 Accessing the Documentation

Once your server is running, access the interactive Swagger UI at:

**URL:** `http://localhost:3000/api-docs`

The Swagger UI provides:
- Interactive API documentation
- Try-it-out functionality for testing endpoints
- Request/response schemas
- Validation rules and examples
- Organized by tags (Users, Projects, Floors, Panels, Breakers, Circuits)

## 🚀 Starting the Server

```bash
npm run start:dev
```

After starting, you'll see:
```
🚀 Application is running on: http://localhost:3000/api
📚 Swagger API Documentation: http://localhost:3000/api-docs
```

## 📊 API Documentation Structure

### Tags & Endpoints

#### **Users** (`/api/users`)
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**Note:** Password field is hashed automatically with bcrypt (10 salt rounds). The `passwordHash` field is excluded from responses using `@Exclude()` decorator.

#### **Projects** (`/api/projects`)
- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects or filter by userId
- `GET /api/projects/:id` - Get project by ID
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Query Parameters:**
- `userId` (optional) - Filter projects by user ID

#### **Floors** (`/api/floors`)
- `POST /api/floors` - Create a new floor
- `GET /api/floors` - Get all floors or filter by projectId
- `GET /api/floors/:id` - Get floor by ID
- `PATCH /api/floors/:id` - Update floor
- `DELETE /api/floors/:id` - Delete floor

**Query Parameters:**
- `projectId` (optional) - Filter floors by project ID

#### **Panels** (`/api/panels`)
- `POST /api/panels` - Create a new electrical panel
- `GET /api/panels` - Get all panels or filter by projectId/floorId
- `GET /api/panels/qr/:slug` - Get panel by QR code slug
- `GET /api/panels/:id` - Get panel by ID
- `PATCH /api/panels/:id` - Update panel
- `DELETE /api/panels/:id` - Delete panel

**Query Parameters:**
- `projectId` (optional) - Filter panels by project ID
- `floorId` (optional) - Filter panels by floor ID

#### **Breakers** (`/api/breakers`)
- `POST /api/breakers` - Create a new circuit breaker
- `GET /api/breakers` - Get all breakers or filter by panelId
- `GET /api/breakers/:id` - Get breaker by ID
- `PATCH /api/breakers/:id` - Update breaker
- `DELETE /api/breakers/:id` - Delete breaker

**Query Parameters:**
- `panelId` (optional) - Filter breakers by panel ID

**Breaker Specifications:**
- `poles`: 1-3 (Single, Double, Triple phase)
- `amperage`: 5-400 amps
- `position`: Slot number in panel (minimum 1)

#### **Circuits** (`/api/circuits`)
- `POST /api/circuits` - Create a new electrical circuit
- `GET /api/circuits` - Get all circuits or filter by breakerId/dedicated status
- `GET /api/circuits/:id` - Get circuit by ID
- `PATCH /api/circuits/:id` - Update circuit
- `DELETE /api/circuits/:id` - Delete circuit

**Query Parameters:**
- `breakerId` (optional) - Filter circuits by breaker ID
- `dedicated` (optional) - Set to 'true' to get only dedicated circuits

## 🔍 Using Swagger UI

### Testing Endpoints

1. **Navigate to** `http://localhost:3000/api-docs`
2. **Expand an endpoint** by clicking on it
3. **Click "Try it out"** button
4. **Fill in the parameters** (the UI shows validation rules and examples)
5. **Click "Execute"** to send the request
6. **View the response** below (status code, body, headers)

### Example: Creating a User

1. Expand `POST /api/users`
2. Click "Try it out"
3. Edit the request body:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "SecurePass123!"
   }
   ```
4. Click "Execute"
5. See the response:
   ```json
   {
     "success": true,
     "message": "User created successfully",
     "data": {
       "id": "uuid-here",
       "name": "John Doe",
       "email": "john@example.com",
       "createdAt": "2024-01-01T00:00:00.000Z",
       "updatedAt": "2024-01-01T00:00:00.000Z"
     }
   }
   ```

## 📋 DTO Examples

All DTOs are documented with:
- Field descriptions
- Validation rules (min/max length, format, required/optional)
- Example values
- Default values where applicable

### Create User DTO
```typescript
{
  name: string;           // User full name
  email: string;          // Valid email format
  password: string;       // Minimum 8 characters
}
```

### Create Project DTO
```typescript
{
  userId: string;         // UUID of the user
  name: string;           // Max 255 characters
  address?: string;       // Optional
  notes?: string;         // Optional
}
```

### Create Floor DTO
```typescript
{
  projectId: string;      // UUID of the project
  name: string;           // Max 255 characters
  orderIndex?: number;    // Default: 0, Minimum: 0
}
```

### Create Panel DTO
```typescript
{
  projectId: string;      // UUID of the project
  floorId: string;        // UUID of the floor
  parentPanelId?: string; // Optional UUID for sub-panels
  name: string;           // Max 255 characters
  location?: string;      // Optional, Max 255 characters
  totalSpaces?: number;   // Optional, Minimum: 1
  photoUrl?: string;      // Optional, Valid URL, Max 500 characters
  qrSlug?: string;        // Optional, Max 100 characters
  notes?: string;         // Optional
}
```

### Create Breaker DTO
```typescript
{
  panelId: string;        // UUID of the panel
  position: number;       // Minimum: 1
  poles: number;          // 1-3 (Single/Double/Triple phase)
  amperage: number;       // 5-400 amps
  type: string;           // Max 50 characters (e.g., "Standard", "GFCI", "AFCI")
  feedsPanelId?: string;  // Optional UUID if feeding sub-panel
  notes?: string;         // Optional
}
```

### Create Circuit DTO
```typescript
{
  breakerId: string;      // UUID of the breaker
  name: string;           // Circuit name, Max 255 characters
  room?: string;          // Optional, Max 255 characters
  loadDescription?: string; // Optional
  isDedicated?: boolean;  // Optional, Default: false
  notes?: string;         // Optional
}
```

## 🔐 API Response Format

All endpoints follow a consistent response format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* resource data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint"
}
```

## 🎯 Status Codes

- `200 OK` - Successful GET/PATCH request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Validation failed
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 🔧 Configuration Details

### Swagger Setup (main.ts)
```typescript
const config = new DocumentBuilder()
  .setTitle('PowerMap API')
  .setDescription('PowerMap Backend API - Electrical panel and circuit management system')
  .setVersion('1.0')
  .addTag('users', 'User management endpoints')
  .addTag('projects', 'Project management endpoints')
  .addTag('floors', 'Floor management endpoints')
  .addTag('panels', 'Electrical panel management endpoints')
  .addTag('breakers', 'Circuit breaker management endpoints')
  .addTag('circuits', 'Circuit management endpoints')
  .addBearerAuth()
  .build();
```

### Decorators Used

#### DTOs
- `@ApiProperty()` - Documents DTO properties with descriptions, examples, validation rules

#### Controllers
- `@ApiTags()` - Groups endpoints by category
- `@ApiOperation()` - Describes what the endpoint does
- `@ApiResponse()` - Documents possible response status codes
- `@ApiParam()` - Documents URL parameters
- `@ApiQuery()` - Documents query string parameters

## 📝 Validation Rules

All DTOs include comprehensive validation:

- **UUIDs**: Validated with `@IsUUID()`
- **Strings**: Max length enforced with `@MaxLength()`
- **Numbers**: Min/max ranges with `@Min()` and `@Max()`
- **Emails**: Format validated with `@IsEmail()`
- **URLs**: Format validated with `@IsUrl()`
- **Required Fields**: Enforced with `@IsNotEmpty()`
- **Optional Fields**: Marked with `@IsOptional()`

## 🌐 CORS Configuration

CORS is enabled for frontend communication:
```typescript
origin: process.env.FRONTEND_URL || 'http://localhost:3001'
credentials: true
```

## 📦 Export API Specification

You can export the OpenAPI specification in JSON format by accessing:
```
http://localhost:3000/api-docs-json
```

This can be imported into:
- Postman
- Insomnia
- API testing tools
- Code generators

## 🎓 Best Practices

1. **Always check the Swagger UI** before implementing frontend calls
2. **Use the "Try it out" feature** to verify request/response formats
3. **Check validation rules** in the schema section of each endpoint
4. **Look at example values** provided in the documentation
5. **Test error cases** to understand error response formats

## 🐛 Troubleshooting

### Swagger UI Not Loading
- Verify server is running on port 3000
- Check console for startup messages
- Navigate to `http://localhost:3000/api-docs` (not `/api/api-docs`)

### Missing Endpoints
- Ensure all controllers have `@ApiTags()` decorator
- Check that controllers are properly imported in modules

### Incomplete Documentation
- Verify DTOs have `@ApiProperty()` decorators
- Check that Update DTOs extend `PartialType` from `@nestjs/swagger`

## 🔄 Updates Made

### Files Modified:
1. **src/main.ts** - Added Swagger configuration
2. **All Controller Files** - Added API decorators (@ApiTags, @ApiOperation, @ApiResponse, @ApiParam, @ApiQuery)
3. **All Create DTO Files** - Added @ApiProperty decorators with descriptions and examples
4. **All Update DTO Files** - Changed PartialType import from @nestjs/mapped-types to @nestjs/swagger

### Package Installed:
- `@nestjs/swagger@latest` - OpenAPI/Swagger integration for NestJS

## 📚 Additional Resources

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)

---

**Happy API Development! 🚀**

Your API is now fully documented and ready for integration with frontend applications or API testing tools.
