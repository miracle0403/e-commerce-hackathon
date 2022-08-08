

CREATE TABLE `users` (
  `User_id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` bigint(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL DEFAULT 'user',
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postal code` int(11) NOT NULL,
  `verification` varchar(255) NOT NULL DEFAULT 'No'
); 



CREATE TABLE `product` (
  `seller_id` varchar(255) NOT NULL,
  `seller_username` varchar(255) NOT NULL,
  `shop` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_description` text NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_discount` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `colours` varchar(255) NOT NULL,
  `reveiws` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  
);