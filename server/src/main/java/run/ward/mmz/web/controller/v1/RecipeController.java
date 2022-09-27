package run.ward.mmz.web.controller.v1;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import run.ward.mmz.domain.account.Account;
import run.ward.mmz.domain.account.Role;
import run.ward.mmz.domain.file.Files;
import run.ward.mmz.domain.post.Direction;
import run.ward.mmz.domain.post.Ingredient;
import run.ward.mmz.domain.post.Recipe;
import run.ward.mmz.domain.post.RecipeTag;
import run.ward.mmz.dto.RecipePostDto;
import run.ward.mmz.dto.common.ResponseDto;
import run.ward.mmz.mapper.post.DirectionMapper;
import run.ward.mmz.mapper.post.IngredientMapper;
import run.ward.mmz.mapper.post.RecipeMapper;
import run.ward.mmz.mapper.post.RecipeTagMapper;
import run.ward.mmz.service.ImageService;
import run.ward.mmz.service.RecipeService;
import run.ward.mmz.service.impl.TestAccountService;

import java.util.List;


@Log4j2
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RecipeController {

    private final DirectionMapper directionMapper;
    private final IngredientMapper ingredientMapper;
    private final RecipeTagMapper recipeTagMapper;
    private final RecipeMapper recipeMapper;

    private final ImageService imageService;
    private final RecipeService recipeService;

    private final TestAccountService testAccountService;

    @PostMapping("/recipe/new")
    public ResponseEntity<ResponseDto.Single<?>> postRecipe(
            Account owner,
            @RequestPart(value = "imgThumbNail", required = false) MultipartFile imgThumbNail,
            @RequestPart(value = "imgDirection", required = false) List<MultipartFile> imgDirections,
            @RequestPart(value = "recipe") RecipePostDto recipePostDto) {

        //Test account

        owner.setId(1L);
        owner.setName("와드");
        owner.setBio("와드입니다.");
        owner.setEmail("ward@ward.run");
        owner.setRole(Role.USER);
        Account testOwner= testAccountService.save(owner);

        //Controller Code

        Files imgThumbNailFile = imageService.save(imgThumbNail);
        List<Direction> directions = directionMapper.toEntity(recipePostDto.getDirections(), imageService.saveAll(imgDirections));
        List<Ingredient> ingredients = ingredientMapper.toEntity(recipePostDto.getIngredients());
        List<RecipeTag> recipeTags = recipeTagMapper.toEntity(recipePostDto.getRecipeTags());


        Recipe recipe = recipeMapper.toEntity(testOwner, recipePostDto, imgThumbNailFile, ingredients, directions, recipeTags);

        recipe = recipeService.save(recipe);

        ResponseDto.Single<Object> response = ResponseDto.Single.builder()
                .data(recipe)
                .build();

        System.out.println("response = " + response);



        return null;
    }

}
