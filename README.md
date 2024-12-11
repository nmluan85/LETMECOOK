# API Test Cases

## 1. Ingredients API Tests
### 1.1 Create Ingredient

```bash
POST http://localhost:3000/api/ingredients/create
```

**Body:**
```JSON
{
  "name": "Chicken Breast",
  "nutrition": {
    "calories": 165,
    "protein": 31,
    "carbs": 0,
    "fat": 3.6
  }
}
```

### 1.2 Update Ingredient
```bash
PUT http://localhost:3000/api/ingredients/update/{ingredientId}
```

**Body:**
```JSON
{
  "name": "Organic Chicken Breast",
  "nutrition": {
    "calories": 165
  }
}
```

### 1.3 Delete Ingredient
```bash
DELETE http://localhost:3000/api/ingredients/delete/{ingredientId}
```

## 2. User API Tests
### 2.1 Create User (Sign Up)
```bash
POST http://localhost:3000/api/users/create
```

**Body:**
```JSON
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Password123!",
  "repeatPassword": "Password123!"
}
```

### 2.2 Login User
```bash
POST http://localhost:3000/api/users/login
```

**Body:**
```JSON
{
  "username": "testuser",
  "password": "Password123!"
}
```

### 2.3 Logout User
```bash
POST http://localhost:3000/api/users/logout
```

### 2.4 Change Password
```bash
PUT http://localhost:3000/api/users/change-password
```

**Body:**
```JSON
{
  "username": "testuser",
  "oldPassword": "Password123!",
  "newPassword": "NewPassword123!",
  "repeatPassword": "NewPassword123!"
}
```

### 2.5 Delete User
```bash
DELETE http://localhost:3000/api/users/delete/{userId}
```

## 3. Post API Tests

### 3.1 Get All Posts
```bash
GET http://localhost:3000/api/posts/all
```

### 3.2 Add Post
```bash
POST http://localhost:3000/api/posts/add
```

**Body:**
```JSON
{
  "title": "Delicious Chicken Recipe",
  "content": "This is how you make the best chicken...",
  "author": "{userId}",
  "tags": ["chicken", "dinner", "healthy"],
  "ingredients": [
    {
      "ingredient": "{ingredientId}",
      "quantity": 2,
      "unit": "pieces"
    }
  ]
}
```

### 3.3 Search Posts
```bash
GET http://localhost:3000/api/posts/search?query=chicken
```

```bash
GET http://localhost:3000/api/posts/search?tags=healthy,dinner
```

```bash
GET http://localhost:3000/api/posts/search?query=chicken&tags=healthy,dinner
```

### 3.4 View Post
```bash
GET http://localhost:3000/api/posts/view/{postId}
```

### 3.5 Delete Post
```bash
DELETE http://localhost:3000/api/posts/delete/{postId}
```

## 4. Plan API Tests

### 4.1 Create Plan
```bash
POST http://localhost:3000/api/plans/create
```

**Body:**
```JSON
{
  "date": "2024-03-15",
  "name": "Monday Meal Plan",
  "user": "{userId}",
  "posts": ["{postId1}", "{postId2}"],
  "ingredients": [
    {
      "ingredient": "{ingredientId}",
      "quantity": 2,
      "unit": "pieces"
    }
  ]
}
```

### 4.2 Get All Plans for User
```bash
GET http://localhost:3000/api/plans/all/{userId}
```

### 4.3 Get Plan by Date
```bash
GET http://localhost:3000/api/plans/date/{date}?userId={userId}
```

### 4.4 Update Plan
```bash
PUT http://localhost:3000/api/plans/update/{planId}
```

**Body:**
```JSON
{
  "name": "Updated Monday Meal Plan",
  "posts": ["{postId1}", "{postId3}"],
  "ingredients": [
    {
      "ingredient": "{ingredientId}",
      "quantity": 3,
      "unit": "pieces"
    }
  ]
}
```

### 4.5 Delete Plan
```bash
DELETE http://localhost:3000/api/plans/{planId}
```