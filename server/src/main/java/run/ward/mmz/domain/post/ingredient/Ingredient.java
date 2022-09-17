package run.ward.mmz.domain.post.ingredient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.post.recipe.Recipe;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "ingredient")
@NoArgsConstructor
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String amount;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;


}
