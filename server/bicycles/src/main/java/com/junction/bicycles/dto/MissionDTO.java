package com.junction.bicycles.dto;

import com.junction.bicycles.model.BicycleStation;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class MissionDTO {

    private Long id;
    private String title;
    private String description;
    private Long score;

    private BicycleStation destination;
    private String lngDestination;
    private String latDestination;
}
