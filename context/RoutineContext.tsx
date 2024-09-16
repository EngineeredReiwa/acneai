// app/(routine)/RoutineContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { Product } from "@/api/firestore";

export const selectList = [
    "category",
    "brand",
    "product",
    "part",
    "dayUsage",
    "weekUsage",
];
export type Select = (typeof selectList)[number];

export const categoryList = ["Cleanser", "Sunscreen", "Serum", "Moisturizer"];
type Category = (typeof categoryList)[number];

export const partList = [
    "Full Face",
    "Forehead",
    "Cheeks",
    "Nose",
    "Chin",
    "Around Eyes",
];
type Part = (typeof partList)[number];

export const dayUsageList = ["AM", "PM", "AM&PM"];
type DayUsage = (typeof dayUsageList)[number];

export const weekUsageList = ["1", "2", "3", "4", "5", "6", "7"];
type WeekUsage = (typeof weekUsageList)[number];

export type Routine = {
    category: Category;
    brand: string;
    brandId: string;
    product: string;
    productId: string;
    ingredients: string[];
    image: string;
    part: Part;
    dayUsage: DayUsage;
    weekUsage: WeekUsage;
};

const initialRoutine: Routine = {
    category: "",
    brand: "",
    brandId: "",
    product: "",
    productId: "",
    ingredients: [""],
    image: "",
    part: "",
    dayUsage: "",
    weekUsage: "",
};

// SectionList用に、データ構造を変更
type Routines = {
    category: Category;
    data: Routine[];
};

// const initialRoutines: Routines[] = [
//     {category: "Cleanser", data: [] },
//     {category: "Sunscreen", data: [] },
//     {category: "Serum", data: [] },
//     {category: "Moisturizer", data: [] },
// ];
// こういうinitialRoutinesを、categoryListから自動生成
const initialRoutines: Routines[] = categoryList.map((category) => ({
    category,
    data: [],
}));

type RoutineContextType = {
    AMroutines: Routines[];
    delAMRoutine: (c: Category, j: number) => void;
    PMroutines: Routines[];
    delPMRoutine: (c: Category, j: number) => void;
    routine: Routine;
    setRoutine: React.Dispatch<React.SetStateAction<Routine>>;
};

const initialRoutineContext: RoutineContextType = {
    AMroutines: initialRoutines,
    delAMRoutine: () => {},
    PMroutines: initialRoutines,
    delPMRoutine: () => {},
    routine: initialRoutine,
    setRoutine: () => {},
};

const RoutineContext = createContext<RoutineContextType>(initialRoutineContext);

export const RoutineProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [AMroutines, setAMRoutines] = useState<Routines[]>(initialRoutines);
    const [PMroutines, setPMRoutines] = useState<Routines[]>(initialRoutines);
    const [routine, setRoutine] = useState<Routine>(initialRoutine);

    useEffect(() => {
        // routine objectの中身を表示する
        console.log(JSON.stringify(routine));
        // routineの全てのkeyが、initialRoutineのvalueでなくなったら、routines配列に追加
        if (
            routine["category"] !== "" &&
            routine["brand"] !== "" &&
            routine["product"] !== "" &&
            routine["image"] !== "" &&
            routine["dayUsage"] !== "" &&
            routine["weekUsage"] !== "" &&
            routine["ingredients"].length !== 0 &&
            routine["part"].length !== 0
        ) {
            // routinesの中で、dayUsageとcategoryが一致するものを探して、そのdataに追加
            if (routine.dayUsage === "AM" || routine.dayUsage === "AM&PM") {
                const newRoutines = AMroutines.map((r) => {
                    if (r.category === routine.category) {
                        return {
                            ...r,
                            data: [...r.data, routine],
                        };
                    }
                    return r;
                });
                console.log("setAMRouines Done");
                setAMRoutines(newRoutines);
            }
            if (routine.dayUsage === "PM" || routine.dayUsage === "AM&PM") {
                const newRoutines = PMroutines.map((r) => {
                    if (r.category === routine.category) {
                        return {
                            ...r,
                            data: [...r.data, routine],
                        };
                    }
                    return r;
                });
                console.log("setPMRouines Done");
                setPMRoutines(newRoutines);
            }
            setRoutine(initialRoutine);
        }
    }, [routine]);

    // AMroutine[categoryName].data[index]を指定して、削除する関数
    const delAMRoutine = (c: Category, i: number) => {
        const newRoutines = AMroutines.map((r) => {
            if (r.category === c) {
                return {
                    ...r,
                    data: r.data.filter((_, j) => j !== i),
                };
            }
            return r;
        });
        setAMRoutines(newRoutines);
    };
    // PMroutine[categoryName].data[index]を指定して、削除する関数
    const delPMRoutine = (c: Category, i: number) => {
        const newRoutines = AMroutines.map((r) => {
            if (r.category === c) {
                return {
                    ...r,
                    data: r.data.filter((_, j) => j !== i),
                };
            }
            return r;
        });
        setPMRoutines(newRoutines);
    };

    return (
        <RoutineContext.Provider
            value={{
                AMroutines,
                delAMRoutine,
                PMroutines,
                delPMRoutine,
                routine,
                setRoutine,
            }}
        >
            {children}
        </RoutineContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(RoutineContext);
    if (!context) {
        throw new Error("useRoutine must be used within a RoutineProvider");
    }
    return context;
};
