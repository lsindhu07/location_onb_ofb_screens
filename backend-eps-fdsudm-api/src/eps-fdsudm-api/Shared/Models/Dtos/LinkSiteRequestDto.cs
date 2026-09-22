namespace eps_fdsudm_api.Shared.Models.Dtos
{
    // Body for PUT /locations/{id}/site — link an existing Site to a Location.
    public record LinkSiteRequestDto(int site_id);
}
