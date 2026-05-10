INSERT INTO finance.cat_categories (id, name, color, "iconName")
VALUES
(1, 'Food & Drinks', 'orange.400', 'food'),
(2, 'Transport', 'blue.400', 'car'),
(3, 'Entertainment', 'purple.400', 'game'),
(4, 'Health', 'red.400', 'health'),
(5, 'Education', 'teal.400', 'education'),
(6, 'Utilities', 'yellow.500', 'utilities'),
(7, 'Shopping', 'pink.400', 'shopping'),
(8, 'Pets', 'pink.300', 'pet'),
(9, 'Lifestyle', 'cyan.400', 'lifestyle'),
(10, 'Income', 'green.500', 'wallet'),
(11, 'Other', 'gray.400', 'other');

INSERT INTO finance.cat_sub_categories (name, "iconName", "categoryId")
VALUES
-- Food
('Groceries', 'cart', 1),
('Dining Out', 'restaurant', 1),
('Fast Food', 'burger', 1),
('Coffee', 'coffee', 1),
('Delivery', 'delivery', 1),

-- Transport
('Public Transport', 'bus', 2),
('Taxi / Uber', 'taxi', 2),
('Fuel', 'fuel', 2),
('Parking', 'parking', 2),
('Car Maintenance', 'tools', 2),

-- Entertainment
('Cinema', 'movie', 3),
('Streaming', 'tv', 3),
('Games', 'controller', 3),
('Events', 'ticket', 3),

-- Health
('Pharmacy', 'pharmacy', 4),
('Doctor', 'doctor', 4),
('Insurance', 'insurance', 4),
('Gym', 'gym', 4),

-- Education
('Courses', 'course', 5),
('Books', 'book', 5),

-- Utilities
('Electricity', 'electricity', 6),
('Water', 'water', 6),
('Internet', 'wifi', 6),
('Phone', 'phone', 6),
('Rent', 'home', 6),

-- Shopping
('Clothes', 'tshirt', 7),
('Electronics', 'laptop', 7),
('Home', 'sofa', 7),

-- Pets
('Pet Food', 'pet-food', 8),
('Vet', 'vet', 8),
('Grooming', 'scissors', 8),

-- Lifestyle
('Park / Activities', 'park', 9),
('Travel', 'plane', 9),
('Gifts', 'gift', 9),
('Dating', 'heart', 9),

-- Income
('Salary', 'salary', 10),
('Freelance', 'laptop', 10),

-- Other
('Miscellaneous', 'other', 11);

INSERT INTO finance.cat_sub_categories (name, "iconName", "categoryId")
VALUES
-- Transport
('Toll / Peaje', 'toll', 2),

-- Health
('Dentist', 'tooth', 4),

-- Utilities
('Gas', 'gas', 6),

-- Education
('University', 'graduation-cap', 5),

-- Lifestyle / Financial obligations
('Taxes', 'receipt', 9),
('Debts', 'debt', 9),
('Borrowed Money', 'hand-coins', 9);

-- Food
('Snacks', 'snack', 1),
('Alcohol', 'wine', 1),

-- Other
('Emergency', 'alert', 11);