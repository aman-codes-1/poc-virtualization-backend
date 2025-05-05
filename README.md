# Problem Statement

We usually face performance issue when a lot of data comes into memory on frontend especially whenever we talk about dropdowns and tables.

So, for this we have to come up with a solution where we have maintain 1 lakh records in DB for dropdown and render it on UI
We have to use a pagination approach to send the data that we need on the UI. Server based approach
We have to send all data in one go to the client and then use indexed DB/ virtual components to handle that amount of data.
Expectation is that there should not be any lag while selection in dropdown and dropdown should be multi select.
