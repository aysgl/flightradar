import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../redux/flightAction';
import { calculateTimeDifference, getTime } from '../constants';
import Time from './Time';

const Modal = ({ id, closeModal }) => {
    const state = useSelector((store) => store.flight);
    const dispatch = useDispatch();
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        dispatch(getDetails(id));
    }, [id, dispatch]);

    useEffect(() => {
        const departure = getTime(state.details?.time?.scheduled.departure);
        const arrival = getTime(state.details?.time?.scheduled.arrival);
        const current = getTime(state.details?.time?.real?.departure);

        if (departure && arrival) {
            const totalDepartureTime = calculateTimeDifference(departure, current)
            const totalFlightTime = Math.abs(calculateTimeDifference(arrival, departure));

            const percentage = (totalDepartureTime / totalFlightTime) * 100;

            if (percentage === 0) {
                setProgressWidth(10);
            } else {
                setProgressWidth(Math.min(percentage, 100))
            }
        }
    }, [state.details?.time?.scheduled.departure, state.details?.time?.scheduled.arrival, state.details?.time?.real?.departure]);

    return (
        <div className="modal d-block">
            <div className="modal-dialog">
                <div className="modal-content border-0">
                    <div className="modal-header">
                        <h5 className="modal-title h6 fw-bold">
                            {state.details.aircraft?.model.code} - {state.details.aircraft?.model.text}
                        </h5>
                        <button onClick={() => closeModal()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-0">
                        {state.isLoading ?
                            <div className='loader-wrapper my-5'>
                                <div className="loader">
                                    <span></span>
                                </div>
                            </div>
                            : (
                                <div>
                                    <img className='img-fluid w-100' src={state.details.aircraft?.images?.medium[0].src} alt='' />
                                    <div className='d-flex justify-content-between align-items-center row g-1 m-1'>
                                        <div className='col-6 text-center text-truncate'>
                                            <div className='rounded bg-light p-3 mb-1'>
                                                <h1 className='mb-0'>{state.details.airport?.destination?.code.iata}</h1>
                                                <p className='small mb-0 text-truncate text-secondary'>{state.details.airport?.destination?.name}</p>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-center rounded bg-light p-3'>
                                                <Time /> {getTime(state.details?.time?.scheduled.departure)}
                                            </div>
                                        </div>
                                        <div className='col-6 text-center text-truncate'>
                                            <div className='rounded bg-light p-3 mb-1'>
                                                <h1 className='mb-0'>{state.details.airport?.origin?.code.iata}</h1>
                                                <p className='small mb-0 text-truncate text-secondary'>{state.details.airport?.origin?.name}</p>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-center rounded bg-light p-3'>
                                                <Time /> {getTime(state.details?.time?.scheduled.arrival)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='m-1'>
                                        <div className="progress-wrapper">
                                            <div className="progress m-3">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${progressWidth}%`, position: 'relative' }} aria-valuenow={progressWidth} aria-valuemin="0" aria-valuemax="100">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;
