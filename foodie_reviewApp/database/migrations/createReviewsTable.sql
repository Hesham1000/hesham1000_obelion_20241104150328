CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    foodItem VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    reviewText TEXT NOT NULL
);
