# 📈 Stock Trading API

This API allows users to manage stock trades, authenticate securely, and refresh expired tokens.

## 🚀 Features
- 🔑 User authentication (Login, Logout)
- 🏦 Buy & Sell Trades
- 📄 Fetch trade history
- 🔄 Token refresh for seamless authentication

---

## 🛠️ Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file with:
   ```
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
3. Start the server:
   ```sh
   npm start
   ```

---

## 🔐 **Authentication APIs**
### **1⃣ Login / Signup**
- **Endpoint:** `POST /api/auth`
- **Description:** Logs in an existing user or registers a new one.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "your_jwt_access_token",
    "refreshToken": "your_jwt_refresh_token"
  }
  ```
- **Notes:** Store the `accessToken` and use it for authenticated requests.

---

### **2⃣ Refresh Access Token**
- **Endpoint:** `POST /api/refresh`
- **Description:** Generates a new access token if the old one expires.
- **Request:** Requires a valid `refreshToken` in cookies.
- **Response:**
  ```json
  {
    "accessToken": "new_jwt_access_token"
  }
  ```

---

### **3⃣ Logout**
- **Endpoint:** `POST /api/logout`
- **Description:** Logs out a user by invalidating their refresh token.
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

---

## 📊 **Trade APIs**
### **4⃣ Create Trade**
- **Endpoint:** `POST /api/trades`
- **Authentication:** Bearer `accessToken`
- **Request Body:**
  ```json
  {
    "type": "buy",
    "symbol": "AAPL",
    "shares": 10,
    "price": 150
  }
  ```
- **Response:**
  ```json
  {
    "message": "Trade added successfully",
    "data": {
      "id": "12345",
      "type": "buy",
      "symbol": "AAPL",
      "shares": 10,
      "price": 150,
      "timestamp": "2025-02-16T12:00:00Z"
    }
  }
  ```

---

### **5⃣ Fetch Trades**
- **Endpoint:** `GET /api/trades`
- **Authentication:** Bearer `accessToken`
- **Query Params (Optional):** `?type=buy` or `?type=sell`
- **Response:**
  ```json
  {
    "data": [
      {
        "id": "12345",
        "type": "buy",
        "symbol": "AAPL",
        "shares": 10,
        "price": 150,
        "timestamp": "2025-02-16T12:00:00Z"
      }
    ]
  }
  ```

---

### **6⃣ Fetch Trade by ID**
- **Endpoint:** `GET /api/trades/:id`
- **Authentication:** Bearer `accessToken`
- **Response:**
  ```json
  {
    "id": "12345",
    "type": "buy",
    "symbol": "AAPL",
    "shares": 10,
    "price": 150,
    "timestamp": "2025-02-16T12:00:00Z"
  }
  ```

---

## ⚙️ **Error Handling**
| Status Code | Meaning                  |
|-------------|--------------------------|
| 200         | ✅ Success               |
| 201         | ✅ Created               |
| 400         | ❌ Bad Request           |
| 401         | ❌ Unauthorized          |
| 403         | ❌ Forbidden (Invalid Token) |
| 404         | ❌ Not Found             |

---

## 🧪 **Run Tests**
```sh
npm test
```

---

## 👨‍💻 **Contributors**
- **Shivang Srivastava**  

---

## 🎯 **Future Improvements**
- WebSockets for real-time trade updates  
- Portfolio tracking & analysis  

---

### 🚀 **Happy Trading! 📈**

