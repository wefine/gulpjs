function doSomething(todo) {
    console.log("before do something");
    todo && todo();
    console.log("after do something..");
}