import {measurementUnits} from "@/consts";
import {Input} from "@/equix/Input";
import {useStore} from "@/pages/_app";
import {InputOption, Repair} from "@/types";
import {getRepairDescription, getWorks, toOptions} from "@/utils";
import {observer} from "mobx-react";

export const WorkTable = observer(() => {
    const {
        selectedRepair,
        setSelectedRepair,
        createWork,
        deleteWork,
        updateWork,
        selectedRepairType,
        getSelectedWorks
    } = useStore();

    const workOptions = toOptions(Object.keys(getWorks(selectedRepairType)));

    const updateDescription = () =>
        setSelectedRepair({
            описание: getRepairDescription(selectedRepair, selectedRepairType),
        });

    return (
        <table className="w-full">
            <tbody>
            <tr>
                <th colSpan={100}>Проведенные работы</th>
            </tr>
            <tr>
                <th>Тип работы</th>
                <th>Кол-во</th>
                <th>Ед. изм.</th>
                <th>Цена</th>
                {(selectedRepair as Repair).работы.length > 1 && <th>Действия</th>}
            </tr>
            {(selectedRepair as Repair).работы.map((work, index) => {
                return (
                    <tr key={index}>
                        <td>
                            <Input
                                type="radio"
                                options={workOptions}
                                value={workOptions.find((option) =>
                                    work["Содержание работ"].includes(option.name)
                                )}
                                isCollapsed
                                onChange={(value: InputOption) => {
                                    console.log(value)
                                    work["Содержание работ"] = value.name
                                    work["цена"] = getWorks(selectedRepairType)[work["Содержание работ"]]

                                    alert(getWorks(selectedRepairType)[work["Содержание работ"]]);
                                    updateDescription();
                                }}
                            />
                        </td>
                        <td className="w-20">
                            <Input
                                type="text"
                                size={4}
                                value={work.количество}
                                onChange={(value: string) => {
                                    updateWork(work.id, {
                                        ...work,
                                        количество: value,
                                    });
                                    setSelectedRepair()
                                    updateDescription();
                                }}
                            />
                        </td>
                        <td className="w-16">
                            {selectedRepairType === "ППР" ? (
                                "шт."
                            ) : (
                                <Input
                                    type="radio"
                                    options={toOptions(measurementUnits)}
                                    value={toOptions(measurementUnits).find((option) =>
                                        work.единицаИзмерения.includes(option.name)
                                    )}
                                    onChange={(value: InputOption) => {
                                        updateWork(work.id, {
                                            ...work,
                                            единицаИзмерения: value.name,
                                        });
                                        updateDescription();
                                    }}
                                />
                            )}
                        </td>
                        <td>{work["цена"]}</td>

                        {(selectedRepair as Repair).работы.length > 1 && (
                            <td className="w-20">
                                <button
                                    className="text-red-600 w-full text-center"
                                    onClick={() => {
                                        const confirmed = confirm("Подтвердите удаление");
                                        if (confirmed) {
                                            deleteWork(work.id);
                                            updateDescription();
                                        }
                                    }}
                                >
                                    Удалить
                                </button>
                            </td>
                        )}
                    </tr>
                )
            })}
            <tr>
                <td colSpan={100}>
                    <button
                        className="w-full"
                        onClick={() => {
                            createWork();
                        }}
                    >
                        Добавить
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    );
});
