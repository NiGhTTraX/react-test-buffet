export default {
  props: {
    addTodo: ({ title }) => { console.log(`You should add '${title}'`); }
  }
};
