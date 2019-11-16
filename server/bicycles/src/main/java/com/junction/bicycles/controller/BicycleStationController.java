package com.junction.bicycles.controller;

import com.junction.bicycles.dto.BicycleStationDTO;
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
    private BicycleStationService bicycleStationService;
    @Autowired
    private MissionRepository missionRepository;

    @RequestMapping(value = "/stations", method = RequestMethod.GET)
    public List<BicycleStationDTO> allBicycleStations() {
        return bicycleStationService.getAzurePredictionCall();
    }
}
