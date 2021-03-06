const axios = require('axios')
const KEY = process.env.API_KEY;
const { Temperament, Dog } = require('../db');

const allDogApi = async () => {
    const ApiGet = await axios.get(`https://api.thedogapi.com/v1/breeds?${KEY}`)
    const ApiInfo = await ApiGet.data.map(d => {
        //console.log(d.temperament.split(',').slice(1,4).toString()) 
        return {
            weight_min: parseInt(d.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(d.weight.metric.slice(4).trim()),
            height_min: parseInt(d.weight.metric.slice(0, 2).trim()),
            height_max: parseInt(d.weight.metric.slice(4).trim()),
            id: d.id,
            name: d.name,
            image: d.image.url,
            life_span: d.life_span,
            temperaments: d.temperament,
        }
    })

    return ApiInfo

}

const allDogsDb = async () => {
    let bd = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    //console.log(bd)
    return bd
} 

//console.log(allDogsDb())

const allDogs = async () => {
    let dogsApi = await allDogApi();
    let dogsDb = await allDogsDb();
    //console.log(dogsDb)
    let dogsAll = dogsApi.concat(dogsDb)
    return dogsAll
}
//console.log(allDogs())


const postDogs = async (weight_min, weight_max, height_min, height_max, name, life_span, temperament, image) => {

   
    if (weight_min && weight_max && height_min && height_max && name && temperament) {
        
        const newDog = await Dog.create({
            name: name,
            height_min: parseInt(height_min),
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            life_span: life_span,
            image: image || 'https://s03.s3c.es/imag/_v0/770x420/7/6/e/Perro-mirando-fijamente-iStock.jpg',
        });
        console.log(temperament)

        temperament.map(async el => {
            console.log(el)
            const findTemp = await Temperament.findAll({
                where: { name: el }
            });
            console.log(findTemp)
            //console.log(newDog)
            newDog.addTemperament(findTemp);
        })
        return await newDog

    } else {
        console.log('Falta informacion para crear al pichichu')
    }

}

module.exports = {
    allDogs, postDogs
};