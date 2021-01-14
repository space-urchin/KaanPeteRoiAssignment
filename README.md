# Kaan Pete Roi

#### Internship Assignment

### Setup

Install `node` and `npm`.

Run `npm ci` to install dependencies inside the project directory.

Run `node script.js`.

Find the output in `output.csv`.

### Complexity analysis

Parse CSV - **O(n)**

Let 

- **x** be the number of people having the same shift
- **s** be the unique number of shifts

Graph construction - **O(s * (x^2))**

### Approach

1. Figured that I need to group people according to their shift's date and time.
2. Created a map of arrays `{'date + time' : [people]}` to group the people having the same shifts.
3. Had to create a graph using the people who have the same shifts.
4. Connect each of the people to each other and count how many times they are connected.
5. Created map of maps `{person1 : {person2 : count}}` that counts the number of times the same edge occurs (i.e. weight)

### Challenges

- Understanding what the problem wanted as output
- JavaScript syntax
- Had to understand async functions of `csv-parser`

### Limitations

- Might be slow for large inputs
- No tests