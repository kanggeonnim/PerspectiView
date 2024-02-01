package com.example.backend.modules.plot;

import com.example.backend.modules.product.Product;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlotService {
    private final PlotRepository plotRepository;

    /**
     * 플롯 생성
     */
    @Transactional
    public Plot createPlot(Plot plot){
        return plotRepository.save(plot);
    }

    /**
     * 작품으로 플롯 조회
     */
    public Plot getPlot(Product product){
        return plotRepository.findByProduct(product);
    }

    /**
     * 플롯 수정 
     */
    @Transactional
    public Plot updatePlot(Plot plot){
        Plot findPlot = plotRepository.findById(plot.getId()).orElseThrow(()->new RuntimeException());
        findPlot.updatePlot(plot.getName(), plot.getColor());
        return findPlot;
    }

    /**
     * 플롯 삭제
     */
    @Transactional
    public void deletePlot(Long plotId){
        plotRepository.deleteById(plotId);
    }
}
