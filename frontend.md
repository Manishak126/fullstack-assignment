## React Assignment

1. How can you implement shared functionality across a component tree?
   
Ans- Generally we use context API to share the data and functionality across the entire component. It saves us from passing the props manually at every level.  


2. Why is the `useState` hook appropriate for handling state in a complex component?
   
Ans- because It provides a simple and readable way to manage multiple pieces of local state independently. It allowscontrol over state updates and integrates well with other hooks, making it easier to manage and optimize complex state logic within a component.

3. Design a user interface resembling the provided page. Fetch the data from the server and dynamically map the information cards to the fetched data. Ensure that the search functionality is also implemented.

Ans - I have Successfully created the frontend of Help-center. Following are the features of this web app -
i) The user can add any card by going to the Submit a request button of navbar.
ii) After clicking on submit a request the user will get a form asking for title and description, The title should be of minimum 5 characters only then the add button will work.
iii) After clicking on the add button user will get a pop up that card is added.
1v) The user can search for any card by entering the card title to the search bar
