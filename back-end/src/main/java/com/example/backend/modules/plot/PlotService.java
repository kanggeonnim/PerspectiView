package com.example.backend.modules.plot;

import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.product.ProductRepository;
import com.example.backend.modules.story.StoryService;
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
    private final StoryService storyService;

//    private final ProductService productService;
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

//        Product product = productService.findByProductId(productId);
        Product product = productRepository.findById(productId).orElseThrow(()->new NotFoundException());
        Plot creaetPlot = plotRepository.save(plot);
        creaetPlot.setProduct(product);
        return creaetPlot;
    }

    /**
     * 작품으로 플롯 조회
     */
    public List<Plot> findByProductId(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(()->new NotFoundException());
        return plotRepository.findWithStoryByProduct(product);
    }

    /**
     * 스토리 관계와 함께 플롯 조회
     */
    public List<Plot> findWithStoryRelationById(Product product){
        List<Plot> plots = plotRepository.findWithStoryByProduct(product);
        for(Plot plot : plots){
            //스토리 관계 까지 있는 스토리로 업데이트
            plot.updateStories(storyService.findWithStoryRelation(plot));
        }
        return plots;
    }

    /**
     * 플롯 수정
     */
    @Transactional
    public Plot updatePlot(Long plotId, Plot plot) {
        Plot findPlot = plotRepository.findWithStoryById(plotId).orElseThrow(() -> new NotFoundException());
        findPlot.updatePlot(plot.getName(), plot.getColor());
        return findPlot;
    }

    /**
     * 플롯 삭제
     */
    @Transactional
    public void deletePlot(Long plotId) {
        Plot plot = plotRepository.findById(plotId).orElseThrow(() -> new NotFoundException());
        plotRepository.deleteById(plot.getId());
    }

    @Transactional
    public Plot updatePlotName(Long plotId, Plot from) {
        Plot plot = plotRepository.findWithStoryById(plotId).orElseThrow(() -> new NotFoundException());
        plot.setName(from.getName());
        return plot;
    }

    @Transactional
    public Plot updatePlotColor(Long plotId, Plot from) {
        Plot plot = plotRepository.findWithStoryById(plotId).orElseThrow(() -> new NotFoundException());
        plot.setColor(from.getColor());
        return plot;
    }
}
