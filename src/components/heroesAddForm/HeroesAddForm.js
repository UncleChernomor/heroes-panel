import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import { addHero, heroesFetchingError } from "../../actions";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useHttp } from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. +++
// Он должен попадать в общее состояние и отображаться в списке  +++
// и фильтроваться 
// Уникальный идентификатор персонажа можно сгенерировать через uiid +++
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST +++
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе данных из фильтров +++

const HeroesAddForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { filters } = useSelector(state => state);

    const { request } = useHttp();



    const onSubmit = ({ name, description, element }) => {

        const newHero = {
            id: uuid(),
            name,
            description,
            element,
        }

        dispatch(addHero(newHero));

        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero))
            .then(data => {
                reset();
            })
            .catch(() => dispatch(heroesFetchingError()))
    };

    const renderOptions = (key, value) => {
        return (
            key === 'all' ?
                <option key={key}>Я владею элементом...</option> :
                <option key={key} value={key}>{value}</option>
        );

    }

    return (
        <form
            className="border p-4 shadow-lg rounded"
            onSubmit={handleSubmit((data, event) => {
                event.preventDefault()
                onSubmit(data);
            })}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    className="form-control"
                    {...register('name', { required: true, minLength:3, maxLength: 50 })} />
                {
                    errors.name &&
                    <div className="alert alert-danger mt-2" role="alert">This field required{errors.name?.message}</div>
                }
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    className="form-control"
                    style={{ "height": '130px' }}
                    {...register('description', { required: true, minLength:10 })} />
                {
                    errors.description &&
                    <div className="alert alert-danger mt-2" role="alert">This field required</div>
                }
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    className="form-select"
                    {...register('element', {required: true})}>
                    {filters.map(({ key, label }) => renderOptions(key, label))}
                </select>
                {
                    errors.element &&
                    <div className="alert alert-danger mt-2" role="alert">This field required</div>
                }
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;