import firestore from "@react-native-firebase/firestore";

export type Brand = {
    id: string;
    name: string;
};

export type Product = {
    id: string;
    name: string;
    ingredients: string[];
    image: string;
};

export const saveUserData = async (uid: string, userData: any) => {
    await firestore()
        .collection("users")
        .doc(uid)
        .set(userData)
        .then(() => {
            console.log("User data saved successfully");
        })
        .catch((error) => {
            alert("ユーザーデータの保存に失敗しました。");
            throw new Error("Error adding user: ", error);
        });
};

export const getBrandsInCategory = async (
    category: string
): Promise<Brand[]> => {
    try {
        const querySnapshot = await firestore().collection(category).get();
        console.log("Total brands: ", querySnapshot.size);
        const brands: Brand[] = [];
        querySnapshot.forEach((documentSnapshot) => {
            const id = documentSnapshot.id;
            const name = documentSnapshot.data().name;
            if (typeof id === "string" && typeof name === "string") {
                brands.push({ id, name } as Brand);
            } else {
                console.warn(
                    "Document data does not match Brand type:",
                    documentSnapshot.data()
                );
            }
        });
        console.log("Brands in category: ", brands);
        return brands;
    } catch (error) {
        console.log("Error getting brands: ", error);
        return [];
    }
};

export const getProductsInBrands = async (
    category: string,
    brandId: string
): Promise<Product[]> => {
    try {
        const querySnapshot = await firestore()
            .collection(category)
            .doc(brandId)
            .collection("Products")
            .get();
        console.log("Total products: ", querySnapshot.size);
        const products: Product[] = [];
        querySnapshot.forEach((documentSnapshot) => {
            const id = documentSnapshot.id;
            const name = documentSnapshot.data().name;
            const ingredients = documentSnapshot.data().ingredients;
            const image = documentSnapshot.data().image;
            if (
                typeof id === "string" &&
                typeof name === "string" &&
                Array.isArray(ingredients) &&
                typeof image === "string"
            ) {
                products.push({ id, name, ingredients, image } as Product);
            } else {
                console.warn(
                    "Document data does not match Brand type:",
                    documentSnapshot.data()
                );
            }
        });
        console.log("Products in brands: ", products);
        return products;
    } catch (error) {
        console.log("Error getting brands: ", error);
        return [];
    }
};
