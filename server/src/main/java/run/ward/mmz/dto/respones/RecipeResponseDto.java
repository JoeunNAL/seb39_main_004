package run.ward.mmz.dto.respones;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class RecipeResponseDto {

    private Long id;
    private String title;
    private String body;
    private String category;
    private String imgThumbNailUrl;
    private String level;
    private boolean isBookmarked;
    private String stars;
    private int views;
    private String createDate;
    private String modifyDate;

    private List<DirectionResponseDto> directions;
    private List<IngredientResponseDto> ingredients;
    private List<TagResponseDto> tags;
    private List<ReviewResponseDto> reviews;



}
