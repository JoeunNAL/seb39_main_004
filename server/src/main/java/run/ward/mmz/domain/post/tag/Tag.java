package run.ward.mmz.domain.post.tag;

import lombok.Getter;
import lombok.NoArgsConstructor;
import run.ward.mmz.domain.post.recipe.Recipe;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Entity
@Table(name = "tag")
@NoArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    private Recipe recipe;

}