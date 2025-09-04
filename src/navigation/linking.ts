// src/navigation/linking.ts
import { LinkingOptions } from "@react-navigation/native";

type RootStackParamList = {
    Home: undefined;
    UserDetails: { id: string };
};

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ["myapp://"],
    config: {
        screens: {
            Home: "home",
            UserDetails: "user/:id",
        },
    },
};

export default linking;
