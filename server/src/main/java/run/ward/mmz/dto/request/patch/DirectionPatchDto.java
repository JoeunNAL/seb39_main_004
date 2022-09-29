package run.ward.mmz.dto.request.patch;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder

public class DirectionPatchDto {

    private int index;
    private String imgDirectionUrl;
    private String body;
}
