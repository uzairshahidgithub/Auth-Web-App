const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'app.db');

class Database {
  constructor() {
    this.db = null;
    this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      // Ensure database directory exists
      const dbDir = path.dirname(DB_PATH);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }
      
      this.db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          console.error('Error opening database:', err);
          reject(err);
        } else {
          console.log('Connected to SQLite database');
          this.createTables().then(resolve).catch(reject);
        }
      });
    });
  }

  async createTables() {
    return new Promise((resolve, reject) => {
      const schemaPath = path.join(__dirname, 'schema.sql');
      
      // Check if schema file exists, if not create basic schema
      let schema;
      if (fs.existsSync(schemaPath)) {
        schema = fs.readFileSync(schemaPath, 'utf8');
      } else {
        schema = `
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
          
          CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
          CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
        `;
      }
      
      this.db.exec(schema, (err) => {
        if (err) {
          console.error('Error creating tables:', err);
          reject(err);
        } else {
          console.log('Database tables created successfully');
          resolve();
        }
      });
    });
  }

  async createUser(userData) {
    return new Promise((resolve, reject) => {
      const { name, email, password_hash } = userData;
      const query = `
        INSERT INTO users (name, email, password_hash) 
        VALUES (?, ?, ?)
      `;
      
      this.db.run(query, [name, email, password_hash], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name, email });
        }
      });
    });
  }

  async findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      this.db.get(query, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async findUserById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async getUserStats(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          COUNT(*) as total_users,
          (SELECT created_at FROM users WHERE id = ?) as user_joined
        FROM users
      `;
      
      this.db.get(query, [userId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = Database;