package run.ward.mmz.domain.post.direction;

import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.post.recipe.Recipe;

import javax.persistence.*;
@Getter
@Entity
@Table(name = "direction")
@NoArgsConstructor
public class Direction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String body;

    private String directionImageUrl;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

}
