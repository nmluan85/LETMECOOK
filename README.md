# How to run the application
1. From the directory, go to the backend folder and install the necessary packages:
```bash
cd .\backend\
```
```bash
npm install
```
2. Run the server:
```bash
npm run server
```
3. From the directory, go to the front-end folder and install the necessary packages:
```bash
cd .\front-end\
```
```bash
npm install --legacy-peer-deps
```
4. Run the web application:
```bash
npm run dev
```

# Accounts for testing
1. Normal user:
* Email: `mry37570@msssg.com`
* Password: `123456`

2. Premium user:
* Email: `spr23668@kisoq.com`
* Password: `123456`

3. Admin:
* Email: `duyphuc070104@gmail.com`
* Password: `123456`

# Guidance for Some Use Cases

**Note:** From anywhere, to go back to the homepage just click on our website icon on the header at top left.

## Searching
- Use the search bar, then click enter or press the search icon.
- You can choose additional filters and click **"Apply"**.

## Edit Profile
- Click on your avatar.
- You will see options to:
  - Edit profile.
  - Upgrade to premium (if you are a normal user).
  - Manage account (if you are an administrator).

## View Profile
- Click on **"Your Recipe Box"** on the header.
- Here, you can see the posts you have uploaded and saved by switching between **"My Recipes"** and **"Saved Recipes"**.
- To upload a post, click on **"Add a Recipe"** (available only for premium users and administrators).

## View Post
- Search for a post, then simply click on it.
- Alternatively, click on a post displayed on the homepage or any other screen that shows posts.

## Save Post
- Click on the **flag icon** displayed on each post.
- You can view saved posts in your profile.

## Interact with Post
- When viewing a post, you can:
  - Leave reactions (like, heart, etc.).
  - Give ratings.
  - Add comments (scroll down to the comment section).
- You can also see other users' comments.

## View Recipes by Ingredient
- Click on **"Recipe"** on the header to see posts categorized by ingredients.

## View Ingredients
- Click on **"Ingredients"** on the header to see the funny wheel of all ingredients on our website.

## Plan Your Eating Schedule
- Click on **"Nutrition Tracking"** on the header.
- You will see a calendar.
- Click on any date on the calendar, add your dish, then click **OK** to save it.

## Track Nutrition
- Click on **"Nutrition Tracking"** on the header.
- Switch to the **"Tracking"** section.
- Click on a date on the calendar to see the amount of nutrition you have consumed.
  - **Note:** This is only available for days where you have added dishes to your planning schedule.
  - You can also receive warnings and advice for these days.


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
      "quantity": 2
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
