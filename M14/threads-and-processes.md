# Notes about Thread, process, concurrency and parallelism

All of this is summarized to execute all that you need with fewer resources and in a fast timeframe.

Let’s say that on our computer you open the browser to search for something on a website. And after some time, you open the music player to listen to music. The browser and the music app don’t have a relationship and they are different processes. They don’t share resources, like memory, for example, have their own memory heap and memory stack.

If you need to connect these processes, you can use the IPC protocol (inter-process communication protocol), generating a lot of calls to your operational system.

The processes have their own state and life-cycle and they can create sub-processes, which are child processes in node js. In the cluster module, the fork method waits for the execution of sub-processes, and these sub-processes communicate with the “primary” process, balancing the load between the workers and the primary process.

This technique using primary and worker processes is indicated if you are working with database operations, I/O operations, processing files, sending messages to the internet, and other stuff.

One process can have multiple threads.

In NodeJs, we call worker threads. 

The worker thread is responsible to schedule a “heavy task” to another processing unit, to run in the background, inside of your process. When the thread finished the execution, the thread triggers a callback informing the task is done.

With threads, you spend less time to create, remove and change the context, if compared with a process. 

Threads share memory, and information about the process and they can communicate between them.

Worker threads always should be used in case of CPU-intensive operations, the operations in memory. For example, a sort algorithm in memory, data conversion, and mapping, the worker thread is the right choice for this.

## Node process and concurrency model

The NodeJs engine uses a lower number of threads to support a high number of clients. These threads are divided in two: the main thread, called the Event loop, and the thread pool, a lot of threads that run in the background to execute heavy tasks and async tasks.

The event loop and your application run in the same thread, and the coordination between in the background tasks and the main thread is executed using a queue. 

The event loop executes the tasks in the queue following the creation order. When you call an async function, when the result is resolved in the future, the callback passed to the function is executed when this async function is resolved. 

The node js engine uses an architecture event-oriented, so the node uses the event loop to orchestrate the order and the execution of the events. For the heavy tasks, the event loop delegates these tasks to the thread pool and waits for the response. 

These "heavy tasks" could be the FS module, a function that requires processing in memory, like the crypto module. 

If the event loop is waiting too much to execute a callback or the thread pool is delayed too much to send the response to the event loop, this is called event loop blocking. 

If the event loop is blocked, the event loop could not send the response to the other clients. This is why is not indicated to process a lot of items in memory in node js.
