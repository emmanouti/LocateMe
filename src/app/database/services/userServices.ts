import { User } from "../entity/User";

class UserServices {
    findUsers = async (): Promise<any | null> => {
        const result = await User.findAndCount({
            select: ["id", "mail", "role"]
        });
        console.log(result)

        if (!result) {
            return null;
        }
        return result;
    };


    findOneUser = async (user_id: number): Promise<any | null> => {
        const result = await User.findOneOrFail({where: {id: user_id}, relations: {locations: true}, select: ["id", "mail", "role"]});

        if (!result) {
            return null;
        }
        return result;
    };

    createUser = async (data: object): Promise<any | null> => {
        const result = await User.insert(data);

        if (!result) {
            return null;
        }
        return result;
    };

    updateUser = async (user_id: number, data: object): Promise<any | null> => {
        const result = await User.update(user_id, data);

        if (!result) {
            return null;
        }
        return result;
    };

    deleteUser = async (user_id: number): Promise<any | null> => {
        const result = await User.delete(user_id);

        if (!result) {
            return null;
        }
        return result;
    };
}

export default UserServices;