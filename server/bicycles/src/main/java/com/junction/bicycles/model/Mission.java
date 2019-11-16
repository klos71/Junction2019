package com.junction.bicycles.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Mission {

    @Id
    private long id;

    @ManyToOne
    private BicycleStation bicycleStation;

}
