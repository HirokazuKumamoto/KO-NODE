/// <reference path="../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../typings/knockout/knockout.d.ts" />

class ViewModel {

  private static INSTANCE:ViewModel = new ViewModel();

  public static bind() {
    ko.applyBindings(this.INSTANCE);
  }

  private name: KnockoutObservable<string> = ko.observable("");

  private btnClick(): void {
    var senddata:string = "{name: sendata}";
    $.ajax({
      type: "POST",
      url: "/json",
      data: senddata,
      dataType: "json",
    }).done(function(data){
        alert(data.id);
    }).fail(function(data){
        alert('error');
    });
  }
}

$(function(){
  ViewModel.bind();
})
