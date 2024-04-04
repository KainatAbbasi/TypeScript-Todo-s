#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
let todo = [];
console.log(chalk.green('Welcome to the Todo List!'));
(async () => {
    let todoInput = await inquirer.prompt({
        type: 'input',
        name: 'tasks',
        message: chalk.blue('Enter your desired tasks which you want to perform (comma-separated):')
    });
    todo = todoInput.tasks.split(',').map((task) => task.trim());
    console.log('This is your Todo list :', chalk.magenta(todoInput.tasks));
    while (true) {
        let action = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: chalk.blue('Do you want to make some Changes in your Todo list ?'),
            choices: ['Add', 'Delete', 'View', 'Exit']
        });
        if (action.action === 'Add') {
            let newTask = await inquirer.prompt({
                type: 'input',
                name: 'task',
                message: chalk.yellow('Enter the task you want to add:')
            });
            todo.push(newTask.task);
        }
        else if (action.action === 'Delete') {
            let taskToDelete = await inquirer.prompt({
                type: 'list',
                name: 'task',
                message: chalk.yellow('Choose a task to delete:'),
                choices: todo
            });
            todo = todo.filter(task => task !== taskToDelete.task);
        }
        else if (action.action === 'View') {
            console.log(chalk.yellow('Your Todo List:'));
            console.log(todo.join('\n'));
        }
        else {
            console.log(chalk.blue('Thank you for using the Todo List!'));
            break;
        }
    }
})();
