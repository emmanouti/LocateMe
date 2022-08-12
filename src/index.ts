import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Location } from "./entity/Location";

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.mail = "user01@mail.com"
    user.password = "token"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    const location1 = new Location()
    location1.latitude = 41.8932408
    location1.longitude = 12.4829815
    location1.adresse = "Place du Capitole, Piazza del Campidoglio, 00184 Rome RM, Italie"
    location1.user = user
    await AppDataSource.manager.save(location1)
    console.log("Saved a new location with id: " + location1.id)

    const location2 = new Location()
    location2.latitude = 44.83683395385742
    location2.longitude = -0.5735530257225037
    location2.adresse = "Rue Sainte-Catherine (Bordeaux), 1 Rue Sainte-Catherine, 33000 Bordeaux, France"
    location2.user = user
    await AppDataSource.manager.save(location2)
    console.log("Saved a new location with id: " + location2.id)

    console.log("Loading users from the database...")
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find({
        relations: {
            locations: true,
        },
    })
    const locations = await AppDataSource.manager.find(Location)
    console.log("Loaded users: ", users)
    console.log("Loaded locations: ", locations)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))