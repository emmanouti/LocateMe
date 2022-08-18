import { User } from "../entity/User";

class UserServices {
    findUsers = async (): Promise<any | null> => {
        const result = await User.findAndCount();

        if (!result) {
            return null;
        }
        return result;
    };


    findOneUser = async (user_id: number): Promise<any | null> => {
        const result = await User.findOne({where: {id: user_id}, relations: {locations: true}});

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