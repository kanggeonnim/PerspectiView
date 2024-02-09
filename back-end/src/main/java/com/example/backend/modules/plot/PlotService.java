package com.example.backend.modules.plot;

import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.product.ProductRepository;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.user.User;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlotService {
    private final PlotRepository plotRepository;

    private final ProductService productService;
    private final ProductRepository productRepository;

    /**
     * 권한 확인
     */
    public boolean canChange(Long teamId, Long productId, Plot plot) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException());
        //팀의 작품인지 확인
        List<Plot> findPlot = plotRepository.findByProduct(product);

        if (findPlot.contains(plot) && product.getTeam().getId() == teamId) {
            return true;
        }
        return false;
    }

    /**
     * 플롯 생성
     */
    @Transactional
    public Plot createPlot(Long productId, Plot plot) {

        Product product = productService.findByProductId(productId);
        Plot creaetPlot = plotRepository.save(plot);
        creaetPlot.setProduct(product);
        return creaetPlot;
    }

    /**
     * 작품으로 플롯 조회
     */
    public List<Plot> findByProductId(Long productId) {
        Product product = productService.findByProductId(productId);
        return plotRepository.findWithStoryByProduct(product);
    }

    /**
     * 플롯 수정
     */
    @Transactional
    public Plot updatePlot(Long productId, Plot plot) {
        Product product = productService.findByProductId(productId);

        if (!product.equals(plot.getProduct())) {
            throw new RuntimeException();
        }

        Plot findPlot = plotRepository.findById(plot.getId()).orElseThrow(() -> new NotFoundException());
        findPlot.updatePlot(plot.getName(), plot.getColor());
        return findPlot;
    }

    /**
     * 플롯 삭제
     */
    @Transactional
    public void deletePlot(Long productId, Long plotId) {
        Plot plot = plotRepository.findById(plotId).orElseThrow(() -> new NotFoundException());
        if (!plot.getProduct().getId().equals(productId)) {
            throw new RuntimeException();
        }
        plotRepository.deleteById(plotId);
    }
}
