CREATE TYPE user_role AS ENUM ('Admin', 'Loan_Officer', 'Client');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_first_name VARCHAR(50) NOT NULL,
    user_last_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_password TEXT NOT NULL,
    user_role user_role DEFAULT 'Client'
);

CREATE TYPE loan_status AS ENUM ('Submitted', 'Under Review', 'Approved', 'Rejected');

CREATE TABLE loans (
    loan_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    loan_amount NUMERIC(15, 2) NOT NULL,
    loan_purpose TEXT,
    loan_status loan_status DEFAULT 'Submitted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);