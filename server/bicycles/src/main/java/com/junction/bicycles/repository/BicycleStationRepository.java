package com.junction.bicycles.repository;

import com.junction.bicycles.model.BicycleStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BicycleStationRepository extends JpaRepository<BicycleStation, Long> {

}
