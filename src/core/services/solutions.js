export default (solutionsRepository) => {
  return {
    async all() {
      return solutionsRepository.all()
    }
  }
}
