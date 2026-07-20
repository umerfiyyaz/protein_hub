import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
});

let name = process.env.name;
let classe = process.env.class;

console.log(name);
console.log(classe);

console.log("Stating the backend project ");
