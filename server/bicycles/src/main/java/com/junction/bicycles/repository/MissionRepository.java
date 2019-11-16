package com.junction.bicycles.repository;

import com.junction.bicycles.model.BicycleStation;
import com.junction.bicycles.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {
    //List<Mission> getAllByBicycleStationEntry(BicycleStation)
}
