package com.junction.bicycles.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class BicycleStationDTO {

    private Long id;
    private String name;
    private String lat;
    private String lng;
    private Integer maxNumOfSlots;
    private Integer currentNumOfBicycles;

    private List<MissionDTO> missions;

}
