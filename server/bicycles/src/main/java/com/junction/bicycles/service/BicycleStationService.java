package com.junction.bicycles.service;

import com.junction.bicycles.model.BSExternal;
import com.junction.bicycles.model.BicycleStation;
import com.junction.bicycles.repository.BicycleStationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BicycleStationService {

    private static final String AZURE_PREDICT_BICYCLES = "/";
    private static final Integer CALCULATION_VAL_FOR_STATION = 20;

    private BicycleStationRepository bicycleStationRepository;

    @Autowired
    public BicycleStationService(BicycleStationRepository bicycleStationRepository) {
        this.bicycleStationRepository = bicycleStationRepository;
    }


    /**
     * Get the future state of the current station
     * @param bs to input
     * @return the future object
     */
    /*public BicycleStation getThePredictionForTheCurrentStation(BicycleStation bs) {

    }*/




    //TODO Call the AZURE AND GET ALL THE Bicycles for the future +3 hours
    private List<BSExternal> getAzurePredictionCall() {
        //TODO Map JSON to Bicycle External Object
        List<BSExternal> bicyclesPrediction = new ArrayList<>();

        return bicyclesPrediction.stream().filter(this::getEmptyStation).collect(Collectors.toList());
    }

    /**
     * percentage based calculation 20%
     *
     * @param e External Object
     * @return true if it is almost empty
     */
    private boolean getEmptyStation(BSExternal e) {
        int max = e.getMaxNumberOfBicycles();
        int current = e.getNumberOfBicycles();
        int val = current * 100 / max;
        return val <= CALCULATION_VAL_FOR_STATION;
    }
}
