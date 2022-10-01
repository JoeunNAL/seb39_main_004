package run.ward.mmz.service.post;

import org.springframework.data.domain.Page;
import run.ward.mmz.domain.post.Recipe;

import java.util.List;

public interface BookmarkService {

    void setBookmarked(Long recipeId, Long accountId);
    void undoBookmarked(Long recipeId, Long accountId);
    Page<Recipe> findAllBookmarkedRecipeByAccountId(int page, int size, Long accountId, String orderBy, String sort);

}