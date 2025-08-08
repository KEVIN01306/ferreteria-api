import app from "./app.js";



async function main() {
    try{
        app.listen(process.env.PORT, () => console.log('Sevidor iniciado en: ' + "http://localhost:"+process.env.PORT))
    }catch (error){
        console.error("Error: "+ error.message)
    }
    
};

main();
