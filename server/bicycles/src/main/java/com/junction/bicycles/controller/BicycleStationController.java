package com.junction.bicycles.controller;

import com.junction.bicycles.model.BicycleStation;
import com.junction.bicycles.repository.BicycleStationRepository;
import com.junction.bicycles.service.BicycleStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BicycleStationController {

    @Autowired
    private BicycleStationRepository bicycleStationRepository;

    @Autowired
    private BicycleStationService bicycleStationService;

    @RequestMapping(value = "/stations", method = RequestMethod.GET)
    public List<BicycleStation> allBicycleStations() {
        return bicycleStationService.getAzurePredictionCall();
        //return bicycleStationRepository.findAll();
    }

}
