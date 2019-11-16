package com.junction.bicycles.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class Mission {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private Long score;

    @ManyToOne
    private BicycleStation destination;
    private String lonDestination;
    private String latDestination;

}
