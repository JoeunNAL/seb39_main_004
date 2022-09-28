package run.ward.mmz.service;

import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.Tag;

import java.util.List;

public interface RecipeTagService {
    void save(List<Tag> tagList, Recipe recipe);
    List<Tag> findAllByRecipeId(Long recipeId);
    List<Recipe> findAllByTagName(String tagName);

}
