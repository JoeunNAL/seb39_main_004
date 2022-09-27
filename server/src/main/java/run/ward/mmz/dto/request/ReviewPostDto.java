package run.ward.mmz.dto.request;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Lob;

@Data
@Builder
public class ReviewPostDto {

    private String body;
    private int stars;

}
