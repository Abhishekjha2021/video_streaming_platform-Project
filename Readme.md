Building the backend of a video streaming platform..

-------------------------------------------------NODEMON----------------------------------------------------

Nodemon is a tool used in Node.js development that helps streamline the development process by automatically restarting your Node.js application when changes are detected in the codebase. It's particularly handy during the development phase, as it saves you the trouble of manually stopping and restarting your server every time you make changes to your code.
Here's why developers use Nodemon:--1.Automatic Restart 2.Time-saving 3.Improved Developer Experience 4.Enhanced Productivity


-----------------------------------------------PRETTIER---------------------------------------------------------

Prettier is a popular code formatting tool used primarily in web development to ensure consistent and clean code across a project. It automatically formats your code according to a predefined set of rules, such as indentation, spacing, and line breaks. Here's why developers use Prettier:
1.Consistent Code Style: Prettier enforces a consistent code style throughout your project, ensuring that all code written by different developers adheres to the same formatting standards. This consistency improves code readability and maintainability.

2.Automated Formatting: Instead of manually formatting code, developers can rely on Prettier to automatically format their code as they write it or upon saving the file. This saves time and reduces the likelihood of formatting inconsistencies.


----------------------------------------------DOTENV-----------------------------------------------------------------
The dotenv npm package is commonly used in Node.js projects to manage environment variables. Here's why developers use it:

1.Environment Configuration: dotenv simplifies the process of managing environment-specific configuration variables, such as database credentials, API keys, and other sensitive information. Instead of hardcoding these values directly into the code, you can store them in a .env file.
2.Security: Storing sensitive information like passwords or API keys directly in your code can be a security risk, especially if the code is publicly accessible or shared with other developers. dotenv allows you to keep this information separate from your codebase and out of version control systems.
3.Ease of Use: dotenv makes it easy to load environment variables from a .env file into Node.js's process.env object, where they can be accessed throughout your application. This eliminates the need for manual configuration and ensures that environment variables are available wherever they're needed.

Overall, dotenv is a valuable tool for managing environment variables in Node.js applications, offering simplicity, security, and compatibility to streamline the development process and ensure the safe handling of sensitive information.


------------------------------------------------cookies---------------------------------------------------------------------------
A cookie is a small piece of data that a website stores on a user's computer or device. It's typically used by websites to remember information about the user, such as login credentials, preferences, shopping cart items, or tracking information. Cookies play a crucial role in enabling various features and functionalities on websites and improving the user experience.

cookie-parser is a middleware for Express.js, a popular web application framework for Node.js. This middleware is used to parse cookies attached to the client's HTTP requests and populate the req.cookies object with the parsed cookies.

